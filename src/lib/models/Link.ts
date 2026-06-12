import mongoose, { Document, Schema } from "mongoose";

interface IClick {
  timestamp: Date;
  referrer: string;
  userAgent: string;
}

export interface ILink extends Document {
  slug: string;
  originalUrl: string;
  userId: string;
  clicks: IClick[];
  createdAt: Date;
}

const ClickSchema = new Schema<IClick>({
  timestamp: { type: Date, default: Date.now },
  referrer: { type: String, default: "" },
  userAgent: { type: String, default: "" },
});

const LinkSchema = new Schema<ILink>(
  {
    slug: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    userId: { type: String, required: true },
    clicks: { type: [ClickSchema], default: [] },
  },
  { timestamps: true },
);

export const Link =
  mongoose.models.Link ?? mongoose.model<ILink>("Link", LinkSchema);
