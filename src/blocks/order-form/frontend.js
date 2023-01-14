document.addEventListener('DOMContentLoaded', () => {
  const ffg = () => {
    const formGroup = document.querySelectorAll('.form-group');
    const formBlocks = document.querySelectorAll('.form-block');
    const formFile = document.querySelector('.form-file');
    const formSelect = document.querySelector('.form-select');

    console.log(formGroup)

    // init
    // formBlocks.forEach((formBlock, index) => {
    //   if (index !== 0) {
    //     formBlock.classList.add('hidden');
    //   }
    // });
    //
    // const closeAllFormBlocks = () => {
    //   formBlocks.forEach((formBlock) => {
    //     formBlock.classList.add('hidden');
    //   });
    // }
    //
    // const openFormBlock = (id) => {
    //   formBlocks.forEach((formBlock, index) => {
    //     if (index === id) {
    //       formBlock.classList.remove('hidden');
    //     }
    //   });
    // }


    // toggle function
    // formBlocks.forEach((formBlock, index) => {
    //   const formBlockHeader = formBlock.querySelector('.form-block-header');
    //
    //   let isOpen = false;
    //   let isActive = false;
    //
    //   index === 0 ? isOpen = true : isOpen = false;
    //   index === 0 ? isActive = true : isActive = false;
    //
    //
    //   formBlockHeader.addEventListener('click', (event) => {
    //     event.preventDefault();
    //
    //     formBlocks.forEach((block) => {
    //       isOpen = false;
    //       block.classList.add('hidden');
    //     });
    //
    //     !isOpen ? formBlock.classList.remove('hidden') : formBlock.classList.add('hidden');
    //     isOpen = !isOpen;
    //   });
    //
    // });

    // formFile.addEventListener('change', (event) => {
    //   if (event) {
    //     closeAllFormBlocks();
    //     openFormBlock(1);
    //   }
    // });

    // formSelect.addEventListener('change', (event) => {
    //   console.log(event)
    //   if (event) {
    //     closeAllFormBlocks();
    //     openFormBlock(2);
    //   }
    // })
  }


});