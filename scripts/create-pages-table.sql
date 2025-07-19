-- Create the pages table if it doesn't exist
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    Company_name TEXT NOT NULL,
    person_name TEXT NOT NULL
);

-- Create an index on the slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Create an index on the updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_pages_updated_at ON pages(updated_at DESC);

-- Create an index on the data JSONB column for faster searches
CREATE INDEX IF NOT EXISTS idx_pages_data_title ON pages USING GIN ((data->>'title'));
CREATE INDEX IF NOT EXISTS idx_pages_data_content ON pages USING GIN ((data->>'content'));
CREATE INDEX IF NOT EXISTS idx_pages_data_status ON pages USING GIN ((data->>'status'));

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data if the table is empty
INSERT INTO pages (slug, data, Company_name, person_name)
SELECT 
    'sample-page-' || generate_random_uuid(),
    jsonb_build_object(
        'title', 'Welcome to AI Page Manager',
        'content', 'This is your first AI-generated page! You can edit, duplicate, or delete this page. Start creating amazing content with AI assistance.',
        'prompt', 'Create a welcome message for new users',
        'status', 'published',
        'tags', '["welcome", "getting-started"]',
        'wordCount', 25,
        'thumbnail', null
    ),
    'AI Company',
    'Demo User'
WHERE NOT EXISTS (SELECT 1 FROM pages LIMIT 1);
