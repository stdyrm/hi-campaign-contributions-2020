const PARAMS = {
	APP: {},
	PAGE: {},
	CHART: {
		id: "",
    title: "HI Campaign Contributions 2020",
    subtitle:
			"Data from the State of Hawaii Campaign Spending Commission",
		root: "candidate",
		children: [
			"contributorType",
			"contributor"
		],
		value: "amount",
    x: {
      id: "",
      dataType: "nominal",
      scale: "band",
      label: "State",
      axis: "x-axis",
      param: "area_title",
      paramFields: [],
    },
    y: {
      id: "",
      dataType: "nominal",
      scale: "band",
      label: "Occupation",
      axis: "y-axis",
      param: "occ_title",
      paramFields: ["occ_title"],
    },
    color: {
      id: "",
      scale: "color",
      label: "Color category",
      axis: "color-axis",
      param: "a_median",
      selected: "a_median",
      paramFields: [
        {
          label: "Median salary (nominal)",
          value: "a_median",
          description:
            "Data from Bureau of Labor Statistics: \nMay 2019 State Occupational Employment and Wage Estimates",
        },
        {
          label: "Median salary (real)",
          value: "RPP_a_median",
          description: "",
        },
      ],
		},
		dimensions: {
			width: window.innerWidth * .95,
			height: window.innerHeight * .7,
			margin: {
				top: 20,
				bottom: 130,
				left: 40,
				right: 40,
			}
		}
	},
};

export { PARAMS };