import { FrontendViewPage } from './app.po';

describe('frontend-view App', () => {
  let page: FrontendViewPage;

  beforeEach(() => {
    page = new FrontendViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
