export class WesURL {
  private url: URL;
  pathname: string;
  searchParams: URLSearchParams;
  protocol: string;
  hostname: string;

  constructor(url: string, base?: string | URL) {
    this.url = base ? new URL(url, base) : new URL(url);
    this.hostname = this.url.hostname;
    this.pathname = this.url.pathname;
    this.protocol = this.url.protocol.replace(/:$/, '');
    this.searchParams = this.url.searchParams;

    if (this.hostname === '' && this.pathname.indexOf('///') === 0) {
      this.pathname = this.pathname.replace(/^\/\/\//, '/');
    }

    if (this.hostname === '' && this.pathname.indexOf('//') === 0) {
      const hostnameStart = 2;
      const hostnameEnd = this.pathname.indexOf('/', hostnameStart);
      const pathnameStart = hostnameEnd + 1;
      this.hostname = this.pathname.substring(hostnameStart, hostnameEnd);
      this.pathname = this.pathname.substring(pathnameStart);
    }
  }

  toString() {
    const search = this.searchParams.toString();
    return [
      this.protocol,
      '://',
      this.hostname,
      this.pathname,
      search ? `?${search}` : '',
    ].join('');
  }
}
