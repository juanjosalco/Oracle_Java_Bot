resource "oci_artifacts_container_repository" orabot {
  #Required
  compartment_id = var.ociCompartmentOcid
  display_name = "${var.runName}/${var.mtdrKey}/orabot"
  is_public = true
}