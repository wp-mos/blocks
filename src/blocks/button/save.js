import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
const Save = (props) => {
  return (
    <a
      {...useBlockProps.save()}
      href={props.attributes.linkObject.url}
      className={`mos-button is-${props.attributes.config}`}
    >
      <svg x="0px" y="0px" viewBox="0 0 172 46">
        <path d="M170 38C170 41.3137 167.314 44 164 44L8 44C4.68629 44 2 41.3137 2 38L2 7.99999C2 4.68628 4.6863 1.99999 8 1.99999L164 2C167.314 2 170 4.68629 170 8L170 38Z" />
      </svg>
      <span>{props.attributes.text}</span>
    </a>
  );
};

export default Save;
