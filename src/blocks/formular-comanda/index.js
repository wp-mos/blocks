import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

import "./index.css";

registerBlockType("mos-blocks/formular-comanda", {
  edit: Edit,
});
