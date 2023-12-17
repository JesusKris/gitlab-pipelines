variable "aws_instance_ami" {
  type = string
  description = "AWS EC2 instances Amazon Machine Image"
  default = "ami-08766f81ab52792ce" #Ubuntu 20.04 LTS
}

variable "aws_instance_type" {
  type = string
  description = "AWS EC2 instances type"
  default = "t3.micro" #Free tier type
}

variable "aws_vpc_cidr_block" {
  type = string
  description = "AWS costum VPC cidr block"
  default = "10.0.0.0/16"
}

variable "aws_availability_zone" {
  type = string
  description = "AWS subnet availability zone"
}

variable "security_key" {
  type = string
  description = "AWS EC2 security key name"
}

variable "admin_public_ipv4" {
  type = string
  description = "Admin public ipv4 used to map SSH and Grafana access IPs in security groups"
}

variable "stage_env" {
  type = string
  description = "Env"
}