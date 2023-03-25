import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

import "./index.css";

registerBlockType("mos/auth-link", {
  edit: Edit,
});
