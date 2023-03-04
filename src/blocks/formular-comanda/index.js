import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

registerBlockType("mos-blocks/formular-comanda", {
  edit: Edit,
});
