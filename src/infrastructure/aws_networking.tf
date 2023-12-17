resource "aws_vpc" "k3s_vpc" {
  cidr_block = var.aws_vpc_cidr_block
  
  tags = {
    Name = "k3s_vpc-${var.stage_env}"
  }

}

resource "aws_internet_gateway" "k3s_gw" {
  vpc_id = aws_vpc.k3s_vpc.id

  tags = {
    Name = "k3s_gw-${var.stage_env}"
  }
}

resource "aws_route_table" "k3s_route_table" {
  vpc_id = aws_vpc.k3s_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.k3s_gw.id
  }

  tags = {
    Name = "k3s_route_table-${var.stage_env}"
  }
}

resource "aws_subnet" "k3s_subnet" {
  vpc_id            = aws_vpc.k3s_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.aws_availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "k3s_subnet-${var.stage_env}"
  }

}

resource "aws_route_table_association" "k3s_route_table_association" {
  subnet_id      = aws_subnet.k3s_subnet.id
  route_table_id = aws_route_table.k3s_route_table.id
}

resource "aws_security_group" "default_security_group" {
  name        = "default_security_group"
  description = "default EC2 instance security group."
  vpc_id      = aws_vpc.k3s_vpc.id


  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = true
  }

  tags = {
    Name = "default_security_group-${var.stage_env}"
  }
}
