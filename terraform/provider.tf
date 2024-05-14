terraform {
  required_providers{
    oci = {
      source = "hashicorp/oci"
      version >= "5.41.0"
    }
  }
}
provider "oci"{
  region = var.ociRegionIdentifier
}