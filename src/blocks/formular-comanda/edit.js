import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

const Edit = () => {
  const blockProps = useBlockProps();

  return (
    <>
      <div {...blockProps}>{__("This is a block", "mos-blocks")}</div>
    </>
  );
};

export default Edit;
