(()=>{"use strict";const e=window.wp.element,o=window.wp.blocks,t=window.wp.blockEditor,s=window.wp.components,l=window.wp.i18n;(0,o.registerBlockType)("mos-blocks/auth-modal",{edit(o){let{attributes:r,setAttributes:n}=o;const{showRegister:i}=r,c=(0,t.useBlockProps)();return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t.InspectorControls,null,(0,e.createElement)(s.PanelBody,{title:(0,l.__)("General","mos-blocks")},(0,e.createElement)(s.ToggleControl,{label:(0,l.__)("Show Register","mos-blocks"),help:i?(0,l.__)("Showing registration form","mos-blocks"):(0,l.__)("Hiding registration form","mos-blocks"),checked:i,onChange:e=>n({showRegister:e})}))),(0,e.createElement)("div",c,(0,l.__)("This block is not previewable from the editor. View your site for a live demo.","mos-blocks")))}})})();