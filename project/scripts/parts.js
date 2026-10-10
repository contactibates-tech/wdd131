const parts = [
  {
    id: "rect-duct",
    name: "Rectangular Duct Section",
    category: "Ductwork",
    summary: "Straight sections built from flat sheet with a locked seam and sealed corners.",
    standards: [
      "Cut blanks to the drawing dimensions within 1/16 inch.",
      "Form the Pittsburgh lock seam along the long edge and hammer it fully closed.",
      "Install the specified transverse connector on both ends.",
      "Seal every seam and corner with approved duct sealant.",
      "Write the job number and size on the section before staging."
    ],
    checks: ["Length and cross-section match the drawing", "Seam is fully locked with no gaps", "All corners are sealed", "Label is attached"]
  },
  {
    id: "transition",
    name: "Transition (Reducer)",
    category: "Fittings",
    summary: "A fitting that changes duct size while keeping airflow smooth.",
    standards: [
      "Use the layout on the drawing for both end sizes and the offset.",
      "Keep the taper angle within the limit shown on the drawing.",
      "Match the connector type to the neighboring sections.",
      "Seal all seams from the inside where reachable.",
      "Mark the airflow direction on the outside."
    ],
    checks: ["Both end sizes match the drawing", "Taper angle is within the limit", "Seams are sealed", "Airflow arrow is marked"]
  },
  {
    id: "elbow",
    name: "Radius Elbow",
    category: "Fittings",
    summary: "A turning fitting that changes direction with a smooth curve.",
    standards: [
      "Build to the centerline radius on the drawing.",
      "Make the throat and heel gores from the same pattern so they fit together.",
      "Install turning vanes if the drawing calls for a square elbow.",
      "Seal all gore seams and connector corners.",
      "Check that the finished angle matches the drawing."
    ],
    checks: ["Radius and angle match the drawing", "Gores are aligned with no gaps", "Vanes are installed if required", "Seams are sealed"]
  },
  {
    id: "plenum",
    name: "Equipment Plenum",
    category: "Equipment",
    summary: "A large box that connects equipment to the duct system.",
    standards: [
      "Use the sheet gauge listed on the drawing.",
      "Reinforce large panels exactly as the drawing shows.",
      "Cut collar and access openings within 1/8 inch of the drawing location.",
      "Attach insulation fully and keep edges sealed.",
      "Confirm the equipment connection flange fits the unit."
    ],
    checks: ["Gauge and dimensions match the drawing", "Reinforcement is installed", "Openings are in the right place", "Insulation is secure"]
  },
  {
    id: "hanger",
    name: "Hanger Strap Assembly",
    category: "Supports",
    summary: "Strap supports that hold ductwork to the building structure.",
    standards: [
      "Use strap in the width and gauge listed on the drawing.",
      "Wrap the strap under the duct and fasten each side with at least two screws.",
      "Space hangers at the interval shown on the drawing.",
      "Attach the upper end to the structure with the approved fastener.",
      "Keep screw heads from touching insulation."
    ],
    checks: ["Strap size matches the drawing", "Two screws on each side", "Spacing matches the drawing", "Upper fastener is approved type"]
  }
];
