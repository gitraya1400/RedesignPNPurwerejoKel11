import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. index.html lang
    if filepath.endswith('index.html'):
        content = content.replace('<html lang="en">', '<html lang="id">')

    # 2. SVGs
    if filepath.endswith('.tsx') or filepath.endswith('.jsx'):
        # Add aria-hidden="true" to svg if it doesn't have it
        def svg_replacer(match):
            svg_tag = match.group(0)
            if 'aria-hidden' not in svg_tag and 'aria-label' not in svg_tag and 'role=' not in svg_tag:
                return svg_tag.replace('<svg', '<svg aria-hidden="true"')
            return svg_tag
        content = re.sub(r'<svg[^>]*>', svg_replacer, content)

    # 3. Inputs missing labels
    if filepath.endswith('.tsx') or filepath.endswith('.jsx'):
        def input_replacer(match):
            input_tag = match.group(0)
            if 'aria-label' not in input_tag and 'id=' not in input_tag:
                # Try to extract placeholder to use as label
                placeholder_match = re.search(r'placeholder="([^"]+)"', input_tag)
                if placeholder_match:
                    return input_tag.replace('<input', f'<input aria-label="{placeholder_match.group(1)}"')
                else:
                    return input_tag.replace('<input', '<input aria-label="Input"')
            return input_tag
        content = re.sub(r'<input[^>]*>', input_replacer, content)
        
    # 4. Buttons for dropdowns (in Header.tsx mainly)
    if filepath.endswith('Header.tsx'):
        # Add aria-expanded and aria-haspopup to buttons that toggle submenus
        # Let's just find the buttons that have onClick related to menus and add aria-expanded
        def btn_replacer(match):
            btn_tag = match.group(0)
            # if it contains onClick for menus or is used for dropdowns
            if 'onClick' in btn_tag or 'activeTopLevels.has' in btn_tag or 'activeSubmenu' in btn_tag:
                if 'aria-expanded' not in btn_tag:
                    btn_tag = btn_tag.replace('<button', '<button aria-haspopup="true" aria-expanded="false"')
            return btn_tag
        content = re.sub(r'<button[^>]*>', btn_replacer, content)

    # 5. Fix Contrast errors. Usually text-gray-400 or text-gray-500 is too light on white backgrounds.
    if filepath.endswith('.tsx') or filepath.endswith('.jsx'):
        content = content.replace('text-gray-400', 'text-gray-600')
        content = content.replace('text-gray-500', 'text-gray-700')
        content = content.replace('text-slate-400', 'text-slate-600')
        content = content.replace('text-slate-500', 'text-slate-700')

    # 6. Empty links (a tags with no content and no aria-label).
    # This is tricky with regex, but we can look for `<a ` lacking `aria-label` and containing only an icon or something.
    if filepath.endswith('.tsx') or filepath.endswith('.jsx'):
        def a_replacer(match):
            a_tag = match.group(0)
            # we just add aria-label if it's missing and we can find href
            if 'aria-label' not in a_tag and 'href' in a_tag:
                # Just add a generic aria-label="Tautan" if it lacks one, though it's better if it has text.
                # Actually, only add if it's likely an icon link (like social media links in footer)
                if 'instagram.com' in a_tag or 'facebook.com' in a_tag or 'youtube.com' in a_tag or 'twitter.com' in a_tag:
                    domain = re.search(r'href="[^"]*(instagram|facebook|youtube|twitter)[^"]*"', a_tag)
                    name = domain.group(1).capitalize() if domain else "Tautan"
                    return a_tag.replace('<a', f'<a aria-label="{name}"')
                
            return a_tag
        content = re.sub(r'<a[^>]*>', a_replacer, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    root_dir = r"D:\kuliah\IMK\paperrrrr\web\RedesignPNPurwerejoKel11"
    for subdir, dirs, files in os.walk(root_dir):
        if 'node_modules' in subdir:
            continue
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx') or file.endswith('.html'):
                filepath = os.path.join(subdir, file)
                try:
                    fix_file(filepath)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == '__main__':
    main()
