import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./main.css";

registerBlockType("mos-blocks/auth-link", {
  edit({ attributes, setAttributes }) {
    const { showAuth } = attributes;

    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "mos-blocks")}>
            <CheckboxControl
              label={__("Show Login/Register Link", "mos-blocks")}
              help={
                showAuth
                  ? __("Showing Link", "mos-blocks")
                  : __("Hiding Link", "mos-blocks")
              }
              checked={showAuth}
              onChange={(showAuth) => setAttributes({ showAuth })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {showAuth && (
            <a className="mos-blocks-sign-in-link open-modal" href="#">
              CONTUL TĂU
            </a>
          )}
        </div>
      </>
    );
  },
});
