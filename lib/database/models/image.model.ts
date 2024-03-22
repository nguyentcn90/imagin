import { Schema, model, models } from "mongoose";

interface IAuthor {
	_id: string;
	firstName: string;
	lastName: string;
}

export interface IImage {
	title: string;
	transformationType: string;
	publicId: string;
	secureUrl: URL;
	width?: number;
	height?: number;
	config?: Record<string, any>;
	transformationURL?: URL;
	aspectRatio?: string;
	color?: string;
	prompt?: string;
	author: IAuthor;
	createAt: Date;
	updateAt: Date;
}

const ImageSchema = new Schema({
	title: { type: String, required: true },
	transformationType: { type: String, required: true },
	publicId: { type: String, required: true },
	secureUrl: { type: URL, required: true },
	width: { type: Number },
	height: { type: Number },
	config: { type: Object },
	transformationURL: { type: URL },
	aspectRatio: { type: String },
	color: { type: String },
	prompt: { type: String },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now },
});

const Image = models?.Image || model("Image", ImageSchema);

export default Image;
