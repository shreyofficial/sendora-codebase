import { Palette, Upload, Image, Globe, Check } from "lucide-react"

export default function WhitelabelPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Whitelabel</h1>
      </div>

      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Branding</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <div className="border border-dashed border-border rounded-lg p-6 text-center">
              <div className="mb-3 flex justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Drag and drop your logo here, or click to browse</p>
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
                Upload Logo
              </button>
              <p className="text-xs text-muted-foreground mt-3">Recommended size: 200x50px, PNG or SVG</p>
            </div>
          </div>

          {/* Favicon Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Favicon</label>
            <div className="border border-dashed border-border rounded-lg p-6 text-center">
              <div className="mb-3 flex justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Drag and drop your favicon here, or click to browse</p>
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
                Upload Favicon
              </button>
              <p className="text-xs text-muted-foreground mt-3">Recommended size: 32x32px, ICO or PNG</p>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Custom Domain</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium mb-2">
              Domain Name
            </label>
            <div className="flex">
              <input
                type="text"
                id="domain"
                placeholder="app.yourdomain.com"
                className="flex-1 bg-background border border-input rounded-lg py-2 px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="ml-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors">
                Verify
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the domain you want to use for your Sendora instance
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">DNS Configuration</div>
                <div className="text-xs text-muted-foreground">Add these records to your DNS settings</div>
              </div>
              <button className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-md text-xs transition-colors">
                Copy
              </button>
            </div>
            <div className="mt-3 p-2 bg-card rounded border border-border font-mono text-xs text-muted-foreground overflow-x-auto">
              <pre>CNAME app.yourdomain.com sendora-app.vercel.app</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-card p-5">
        <h2 className="text-lg font-medium mb-4">Email Customization</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
            <div>
              <div className="text-sm font-medium">Custom Email Sender</div>
              <div className="text-xs text-muted-foreground">Send emails from your own domain</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-1 peer-focus:ring-ring after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
            <div>
              <div className="text-sm font-medium">Custom Email Templates</div>
              <div className="text-xs text-muted-foreground">Customize the look of your emails</div>
            </div>
            <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
              Customize
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
            <div>
              <div className="text-sm font-medium">Email Footer Branding</div>
              <div className="text-xs text-muted-foreground">Remove "Powered by Sendora" from emails</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <Check className="w-3 h-3" />
              <span>Included in Pro Plan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

