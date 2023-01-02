import { registerBlockType } from "@wordpress/blocks";

import "./auth-user-hero.scss";

import Edit from "./edit";
import metadata from "./block.json";

registerBlockType(metadata.name, {
  attributes: metadata.attributes,
  edit: Edit,
});
