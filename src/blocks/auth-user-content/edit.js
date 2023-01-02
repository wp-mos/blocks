import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 */
const Edit = ({ attributes, setAttributes }) => {
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
};

export default Edit;
