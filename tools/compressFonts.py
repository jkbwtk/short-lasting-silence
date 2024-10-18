#!/usr/local/bin/fontforge

import fontforge
import os
import pathlib

root_dir = pathlib.Path(__file__).parent.parent.absolute()

fonts_dir = root_dir.joinpath("resources/fonts")
fonts_out_dir = root_dir.joinpath("src/assets/fonts")

fonts = filter(lambda path: path.endswith(".ttf"), os.listdir(fonts_dir))


for font in fonts:
    file = fontforge.open(str(fonts_dir.joinpath(font)))
    file.generate(str(fonts_out_dir.joinpath(font).with_suffix(".woff2")))
