import {registerBlockType} from "@wordpress/blocks";
import {useBlockProps} from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";

import "./main.css";

registerBlockType("mos-blocks/auth-link", {
  edit() {
    const blockProps = useBlockProps();

    return (
      <>
        <div {...blockProps}>
          <a className="mos-blocks-sign-in-link open-modal" href="#">
            {__("CONTUL TĂU", "mos-blocks")}
          </a>
        </div>
      </>
    );
  },
});
