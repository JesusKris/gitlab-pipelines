resource "aws_security_group" "k3s_master_security_group" {
  name        = "k3s_master_security_group"
  description = "k3s_master EC2 instance security group."
  vpc_id      = aws_vpc.k3s_vpc.id


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    description = "HTTPS kubectl"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["${var.admin_public_ipv4}/32"]
  }


  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.admin_public_ipv4}/32"]
  }

  tags = {
    Name = "k3s_master_security_group-${var.stage_env}"
  }
}


resource "aws_network_interface" "k3s_master_net" {
  subnet_id   = aws_subnet.k3s_subnet.id
  private_ips = ["10.0.1.50"]
  security_groups = [aws_security_group.k3s_master_security_group.id, aws_security_group.default_security_group.id]
  

  tags = {
    Name = "k3s_master_net-${var.stage_env}"
  }
}


resource "aws_instance" "k3s_master" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  availability_zone = var.aws_availability_zone
  key_name = var.security_key

  network_interface {
    device_index = 0
    network_interface_id = aws_network_interface.k3s_master_net.id
  }

  user_data = <<-EOF
    #!/bin/bash
    
    sudo apt-get update

    sudo apt-get install -y curl

    sudo apt install -y jq

    public_ip=$(curl -s https://api64.ipify.org?format=json | jq -r '.ip')

    curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server --tls-san "$public_ip" --node-name master --node-label="node-type=master" --token password" K3S_KUBECONFIG_MODE="644" sh - 

    EOF

  tags = {
    Name = "k3s_master-${var.stage_env}"
  }
}

output "master_public_ip" {
  description = "EC2 designated master's public ipv4 address"
  value = aws_instance.k3s_master.public_ip
}