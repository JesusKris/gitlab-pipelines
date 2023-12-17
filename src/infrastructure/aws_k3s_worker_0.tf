resource "aws_security_group" "k3s_worker-0_security_group" {
  name        = "k3s_worker-0_security_group"
  description = "k3s_worker-0 EC2 instance security group."
  vpc_id      = aws_vpc.k3s_vpc.id


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    description = "HTTP api-gateway"
    from_port   = 31000
    to_port     = 31000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.admin_public_ipv4}/32"]
  }

  tags = {
    Name = "k3s_worker-0_security_group-${var.stage_env}"
  }
}


resource "aws_network_interface" "k3s_worker-0_net" {
  subnet_id   = aws_subnet.k3s_subnet.id
  private_ips = ["10.0.1.52"]
  security_groups = [aws_security_group.k3s_worker-0_security_group.id, aws_security_group.default_security_group.id]
  

  tags = {
    Name = "k3s_worker-0_net-${var.stage_env}"
  }
}


resource "aws_instance" "k3s_worker-0" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  availability_zone = var.aws_availability_zone
  key_name = var.security_key
  depends_on = [ aws_instance.k3s_master ]

  network_interface {
    device_index = 0
    network_interface_id = aws_network_interface.k3s_worker-0_net.id
  }

  user_data = <<-EOF
    #!/bin/bash
    
    sudo apt-get update

    sudo apt-get install -y curl

    sudo curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="agent --server https://10.0.1.50:6443 --node-name worker-0 --token password --node-label="node-type=worker-0"" sh -s -
    EOF

  tags = {
    Name = "k3s_worker-0-${var.stage_env}"
  }
}

output "worker-0_public_ip" {
  description = "EC2 designated worker-0's public ipv4 address"
  value = aws_instance.k3s_worker-0.public_ip
}