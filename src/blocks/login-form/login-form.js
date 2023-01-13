import {registerBlockType} from "@wordpress/blocks";
import {useBlockProps} from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";

import "./login-form.css";

registerBlockType("mos-blocks/login-form", {
  edit() {
    const blockProps = useBlockProps();

    return (
      <>
        <div {...blockProps}>
          {__(
            "This block is not previewable from the editor. View your site for a live demo.",
            "mos-blocks"
          )}
        </div>
      </>
    );
  },
});

