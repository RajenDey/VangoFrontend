// import { app } from "../../scripts/app.js";

const app = window.app;

// Adds an upload button to the nodes

app.registerExtension({
	name: "Comfy.UploadImage",
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
		if (nodeData.name === "LoadImage" || nodeData.name === "LoadImageMask") {
			nodeData.input.required.upload = ["IMAGEUPLOAD"];
		}
	},
});

app.registerExtension({
	name: "Comfy.UploadZip",
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
		if (nodeData.name === "LoadZip") {
			nodeData.input.required.upload = ["ZIPUPLOAD"];
		}
	},
});
