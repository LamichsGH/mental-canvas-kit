export const scrollToElement = (elementId: string, offset: number = 120) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const getHeaderHeight = () => {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 120;
};

export const scrollToSection = (sectionId: string) => {
  const headerHeight = getHeaderHeight();
  scrollToElement(sectionId, headerHeight);
};