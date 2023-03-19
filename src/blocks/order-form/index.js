import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

import "./index.css";

registerBlockType("mos-blocks/order-form", {
  edit: Edit,
});
