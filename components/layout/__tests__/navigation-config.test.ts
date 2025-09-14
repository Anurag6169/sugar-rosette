import { navigationConfig, isActiveLink } from '../navigation-config';

describe('navigation-config', () => {
  describe('navigationConfig', () => {
    it('has all required main navigation links', () => {
      const expectedLinks = [
        'Home', 'Chocolates', 'Hampers', 'Cakes', 
        'Bakery', 'Corporate Gifting', 'About', 'Contact'
      ];
      
      expect(navigationConfig.mainLinks).toHaveLength(expectedLinks.length);
      
      expectedLinks.forEach(linkName => {
        const link = navigationConfig.mainLinks.find(item => item.name === linkName);
        expect(link).toBeDefined();
        expect(link?.href).toBeDefined();
        expect(link?.isExternal).toBeFalsy();
      });
    });

    it('has a CTA button', () => {
      expect(navigationConfig.ctaButton).toBeDefined();
      expect(navigationConfig.ctaButton.name).toBe('Enquire');
      expect(navigationConfig.ctaButton.href).toBe('/enquire');
    });

    it('has proper href paths', () => {
      expect(navigationConfig.mainLinks[0].href).toBe('/');
      expect(navigationConfig.mainLinks[1].href).toBe('/chocolates');
      expect(navigationConfig.mainLinks[2].href).toBe('/hampers');
      expect(navigationConfig.mainLinks[3].href).toBe('/cakes');
      expect(navigationConfig.mainLinks[4].href).toBe('/bakery');
      expect(navigationConfig.mainLinks[5].href).toBe('/corporate-gifting');
      expect(navigationConfig.mainLinks[6].href).toBe('/about');
      expect(navigationConfig.mainLinks[7].href).toBe('/contact');
    });
  });

  describe('isActiveLink', () => {
    it('correctly identifies home page as active', () => {
      expect(isActiveLink('/', '/')).toBe(true);
      expect(isActiveLink('/', '/about')).toBe(false);
    });

    it('correctly identifies sub-pages as active', () => {
      expect(isActiveLink('/chocolates', '/chocolates')).toBe(true);
      expect(isActiveLink('/chocolates', '/chocolates/dark')).toBe(true);
      expect(isActiveLink('/chocolates', '/chocolates/milk')).toBe(true);
      expect(isActiveLink('/chocolates', '/cakes')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isActiveLink('/about', '/about-us')).toBe(false);
      expect(isActiveLink('/contact', '/contacts')).toBe(false);
      expect(isActiveLink('/cakes', '/cake')).toBe(false);
    });
  });
});
