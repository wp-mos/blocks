import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./main.css";

registerBlockType("mos-blocks/auth-modal", {
  edit({ attributes, setAttributes }) {
    const { showRegister } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "mos-blocks")}>
            <ToggleControl
              label={__("Show Register", "mos-blocks")}
              help={
                showRegister
                  ? __("Showing registration form", "mos-blocks")
                  : __("Hiding registration form", "mos-blocks")
              }
              checked={showRegister}
              onChange={(showRegister) => setAttributes({ showRegister })}
            />
          </PanelBody>
        </InspectorControls>
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
