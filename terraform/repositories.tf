resource "oci_artifacts_container_repository" orabot {
  #Required
  compartment_id = var.ociCompartmentOcid
  display_name = "${var.runName}/${var.mtdrKey}/orabot"
  is_public = true
}

resource "oci_artifacts_container_repository" orabot-front {
  #Required
  compartment_id = var.ociCompartmentOcid
  display_name = "${var.runName}/${var.mtdrKey}/orabot-front"
  is_public = true
}