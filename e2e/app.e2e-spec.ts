import { RepogardenPage } from './app.po';

describe('repogarden App', () => {
  let page: RepogardenPage;

  beforeEach(() => {
    page = new RepogardenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
