import { useBlockProps } from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
} from "@wordpress/components";
import {
  RichText,
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import "./style.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 */
const Edit = (props) => {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  function handleTextChange(text) {
    props.setAttributes({ text });
  }

  function buttonHandler() {
    setIsLinkPickerVisible((prev) => !prev);
  }

  function buttonHandlerPrimary() {
    props.setAttributes({ config: "primary" });
    console.log(props.attributes);
  }

  function buttonHandlerSecondary() {
    props.setAttributes({ config: "secondary" });
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.config === "primary"}
            onClick={buttonHandlerPrimary}
            label="Primary"
          >
            Primary
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.config === "secondary"}
            onClick={buttonHandlerSecondary}
            label="Secondary"
          >
            Secondary
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>

      <div className={`mos-button is-${props.attributes.config}`}>
        <svg x="0px" y="0px" viewBox="0 0 172 46">
          <path d="M170 38C170 41.3137 167.314 44 164 44L8 44C4.68629 44 2 41.3137 2 38L2 7.99999C2 4.68628 4.6863 1.99999 8 1.99999L164 2C167.314 2 170 4.68629 170 8L170 38Z" />
        </svg>
        <RichText
          {...useBlockProps()}
          allowedFormats={[]}
          tagName="span"
          value={props.attributes.text}
          onChange={handleTextChange}
          placeholder="Button"
        />
      </div>

      {isLinkPickerVisible && (
        <Popover position="middle center">
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />

          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
};

export default Edit;
