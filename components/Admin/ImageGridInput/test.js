let cachedProductIds = [];

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const formatProductInfoToReadableName = text =>
  text.replaceAll(/\n/g, '').trim();

const performProductInspector = () => {
  const data = Array.from(
    document.querySelectorAll('.l-productgrid__item>article')
  ).filter(isElementInViewport);

  data.forEach(productEl => {
    const productId = productEl.getAttribute('data-pid');
    const productName = formatProductInfoToReadableName(
      productEl.querySelector('.c-product__name').textContent
    );
    const productPrice = formatProductInfoToReadableName(
      productEl.querySelector('.c-price__value--current').textContent
    );
    if (!cachedProductIds.includes(productId)) {
      console.log(
        `[New product logged::] \n Name: ${productName} \n Price: ${productPrice} `
      );
      cachedProductIds.push(productId);
    }
  });
};

if (window.addEventListener) {
  addEventListener('DOMContentLoaded', performProductInspector, false);
  addEventListener('load', performProductInspector, false);
  addEventListener('scroll', performProductInspector, false);
  addEventListener('resize', performProductInspector, false);
} else if (window.attachEvent) {
  attachEvent('onDOMContentLoaded', performProductInspector);
  attachEvent('onload', performProductInspector);
  attachEvent('onscroll', performProductInspector);
  attachEvent('onresize', performProductInspector);
}
