module Framer.Motion.MotionComponent where

import Effect (Effect)
import Framer.Motion.Types (MotionProps)
import Prim.Row (class Union)
import React.Basic (ReactComponent)
import React.Basic.DOM as DOM
import React.Basic.DOM.SVG as SVG
import Type.Row (type (+))

foreign import motionComponentImpl ∷ ∀ a. String -> ReactComponent { | a }

foreign import custom ∷
  ∀ old.
  ReactComponent { | old } ->
  Effect (ReactComponent { | MotionProps old })

-- DOM
abbr :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_abbr) => ReactComponent { | attrs }
abbr = motionComponentImpl "abbr"

address :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_address) => ReactComponent { | attrs }
address = motionComponentImpl "address"

area :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_area) => ReactComponent { | attrs }
area = motionComponentImpl "area"

article :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_article) => ReactComponent { | attrs }
article = motionComponentImpl "article"

aside :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_aside) => ReactComponent { | attrs }
aside = motionComponentImpl "aside"

audio :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_audio) => ReactComponent { | attrs }
audio = motionComponentImpl "audio"

b :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_b) => ReactComponent { | attrs }
b = motionComponentImpl "b"

base :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_base) => ReactComponent { | attrs }
base = motionComponentImpl "base"

bdi :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_bdi) => ReactComponent { | attrs }
bdi = motionComponentImpl "bdi"

bdo :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_bdo) => ReactComponent { | attrs }
bdo = motionComponentImpl "bdo"

-- No support in React Basic Hooks
-- big :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_big) => ReactComponent { | attrs }
-- big = motionComponentImpl "big"
blockquote :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_blockquote) => ReactComponent { | attrs }
blockquote = motionComponentImpl "blockquote"

body :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_body) => ReactComponent { | attrs }
body = motionComponentImpl "body"

br :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_br) => ReactComponent { | attrs }
br = motionComponentImpl "br"

button :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_button) => ReactComponent { | attrs }
button = motionComponentImpl "button"

canvas :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_canvas) => ReactComponent { | attrs }
canvas = motionComponentImpl "canvas"

caption :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_caption) => ReactComponent { | attrs }
caption = motionComponentImpl "caption"

cite :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_cite) => ReactComponent { | attrs }
cite = motionComponentImpl "cite"

code :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_code) => ReactComponent { | attrs }
code = motionComponentImpl "code"

col :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_col) => ReactComponent { | attrs }
col = motionComponentImpl "col"

colgroup :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_colgroup) => ReactComponent { | attrs }
colgroup = motionComponentImpl "colgroup"

_data :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_data) => ReactComponent { | attrs }
_data = motionComponentImpl "data"

datalist :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_datalist) => ReactComponent { | attrs }
datalist = motionComponentImpl "datalist"

dd :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_dd) => ReactComponent { | attrs }
dd = motionComponentImpl "dd"

del :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_del) => ReactComponent { | attrs }
del = motionComponentImpl "del"

details :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_details) => ReactComponent { | attrs }
details = motionComponentImpl "details"

dfn :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_dfn) => ReactComponent { | attrs }
dfn = motionComponentImpl "dfn"

dialog :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_dialog) => ReactComponent { | attrs }
dialog = motionComponentImpl "dialog"

div :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_div) => ReactComponent { | attrs }
div = motionComponentImpl "div"

dl :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_dl) => ReactComponent { | attrs }
dl = motionComponentImpl "dl"

dt :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_dt) => ReactComponent { | attrs }
dt = motionComponentImpl "dt"

em :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_em) => ReactComponent { | attrs }
em = motionComponentImpl "em"

embed :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_embed) => ReactComponent { | attrs }
embed = motionComponentImpl "embed"

fieldset :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_fieldset) => ReactComponent { | attrs }
fieldset = motionComponentImpl "fieldset"

figcaption :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_figcaption) => ReactComponent { | attrs }
figcaption = motionComponentImpl "figcaption"

figure :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_figure) => ReactComponent { | attrs }
figure = motionComponentImpl "figure"

footer :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_footer) => ReactComponent { | attrs }
footer = motionComponentImpl "footer"

form :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_form) => ReactComponent { | attrs }
form = motionComponentImpl "form"

h1 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h1) => ReactComponent { | attrs }
h1 = motionComponentImpl "h1"

h2 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h2) => ReactComponent { | attrs }
h2 = motionComponentImpl "h2"

h3 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h3) => ReactComponent { | attrs }
h3 = motionComponentImpl "h3"

h4 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h4) => ReactComponent { | attrs }
h4 = motionComponentImpl "h4"

h5 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h5) => ReactComponent { | attrs }
h5 = motionComponentImpl "h5"

h6 :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_h6) => ReactComponent { | attrs }
h6 = motionComponentImpl "h6"

head :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_head) => ReactComponent { | attrs }
head = motionComponentImpl "head"

header :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_header) => ReactComponent { | attrs }
header = motionComponentImpl "header"

hgroup :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_hgroup) => ReactComponent { | attrs }
hgroup = motionComponentImpl "hgroup"

hr :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_hr) => ReactComponent { | attrs }
hr = motionComponentImpl "hr"

html :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_html) => ReactComponent { | attrs }
html = motionComponentImpl "html"

i :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_i) => ReactComponent { | attrs }
i = motionComponentImpl "i"

iframe :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_iframe) => ReactComponent { | attrs }
iframe = motionComponentImpl "iframe"

img :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_img) => ReactComponent { | attrs }
img = motionComponentImpl "img"

input :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_input) => ReactComponent { | attrs }
input = motionComponentImpl "input"

ins :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_ins) => ReactComponent { | attrs }
ins = motionComponentImpl "ins"

kbd :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_kbd) => ReactComponent { | attrs }
kbd = motionComponentImpl "kbd"

keygen :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_keygen) => ReactComponent { | attrs }
keygen = motionComponentImpl "keygen"

label :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_label) => ReactComponent { | attrs }
label = motionComponentImpl "label"

legend :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_legend) => ReactComponent { | attrs }
legend = motionComponentImpl "legend"

li :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_li) => ReactComponent { | attrs }
li = motionComponentImpl "li"

link :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_link) => ReactComponent { | attrs }
link = motionComponentImpl "link"

main :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_main) => ReactComponent { | attrs }
main = motionComponentImpl "main"

map :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_map) => ReactComponent { | attrs }
map = motionComponentImpl "map"

mark :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_mark) => ReactComponent { | attrs }
mark = motionComponentImpl "mark"

menu :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_menu) => ReactComponent { | attrs }
menu = motionComponentImpl "menu"

menuitem :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_menuitem) => ReactComponent { | attrs }
menuitem = motionComponentImpl "menuitem"

meta :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_meta) => ReactComponent { | attrs }
meta = motionComponentImpl "meta"

meter :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_meter) => ReactComponent { | attrs }
meter = motionComponentImpl "meter"

nav :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_nav) => ReactComponent { | attrs }
nav = motionComponentImpl "nav"

noscript :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_noscript) => ReactComponent { | attrs }
noscript = motionComponentImpl "noscript"

object :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_object) => ReactComponent { | attrs }
object = motionComponentImpl "object"

ol :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_ol) => ReactComponent { | attrs }
ol = motionComponentImpl "ol"

optgroup :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_optgroup) => ReactComponent { | attrs }
optgroup = motionComponentImpl "optgroup"

option :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_option) => ReactComponent { | attrs }
option = motionComponentImpl "option"

output :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_output) => ReactComponent { | attrs }
output = motionComponentImpl "output"

p :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_p) => ReactComponent { | attrs }
p = motionComponentImpl "p"

param :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_param) => ReactComponent { | attrs }
param = motionComponentImpl "param"

picture :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_picture) => ReactComponent { | attrs }
picture = motionComponentImpl "picture"

pre :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_pre) => ReactComponent { | attrs }
pre = motionComponentImpl "pre"

progress :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_progress) => ReactComponent { | attrs }
progress = motionComponentImpl "progress"

q :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_q) => ReactComponent { | attrs }
q = motionComponentImpl "q"

rp :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_rp) => ReactComponent { | attrs }
rp = motionComponentImpl "rp"

rt :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_rt) => ReactComponent { | attrs }
rt = motionComponentImpl "rt"

ruby :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_ruby) => ReactComponent { | attrs }
ruby = motionComponentImpl "ruby"

s :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_s) => ReactComponent { | attrs }
s = motionComponentImpl "s"

samp :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_samp) => ReactComponent { | attrs }
samp = motionComponentImpl "samp"

script :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_script) => ReactComponent { | attrs }
script = motionComponentImpl "script"

section :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_section) => ReactComponent { | attrs }
section = motionComponentImpl "section"

select :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_select) => ReactComponent { | attrs }
select = motionComponentImpl "select"

small :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_small) => ReactComponent { | attrs }
small = motionComponentImpl "small"

source :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_source) => ReactComponent { | attrs }
source = motionComponentImpl "source"

span :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_span) => ReactComponent { | attrs }
span = motionComponentImpl "span"

strong :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_strong) => ReactComponent { | attrs }
strong = motionComponentImpl "strong"

style :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_style) => ReactComponent { | attrs }
style = motionComponentImpl "style"

sub :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_sub) => ReactComponent { | attrs }
sub = motionComponentImpl "sub"

summary :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_summary) => ReactComponent { | attrs }
summary = motionComponentImpl "summary"

sup :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_sup) => ReactComponent { | attrs }
sup = motionComponentImpl "sup"

table :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_table) => ReactComponent { | attrs }
table = motionComponentImpl "table"

tbody :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_tbody) => ReactComponent { | attrs }
tbody = motionComponentImpl "tbody"

td :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_td) => ReactComponent { | attrs }
td = motionComponentImpl "td"

textarea :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_textarea) => ReactComponent { | attrs }
textarea = motionComponentImpl "textarea"

tfoot :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_tfoot) => ReactComponent { | attrs }
tfoot = motionComponentImpl "tfoot"

th :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_th) => ReactComponent { | attrs }
th = motionComponentImpl "th"

thead :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_thead) => ReactComponent { | attrs }
thead = motionComponentImpl "thead"

time :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_time) => ReactComponent { | attrs }
time = motionComponentImpl "time"

title :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_title) => ReactComponent { | attrs }
title = motionComponentImpl "title"

tr :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_tr) => ReactComponent { | attrs }
tr = motionComponentImpl "tr"

track :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_track) => ReactComponent { | attrs }
track = motionComponentImpl "track"

u :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_u) => ReactComponent { | attrs }
u = motionComponentImpl "u"

ul :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_ul) => ReactComponent { | attrs }
ul = motionComponentImpl "ul"

var :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_var) => ReactComponent { | attrs }
var = motionComponentImpl "var"

video :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_video) => ReactComponent { | attrs }
video = motionComponentImpl "video"

wbr :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_wbr) => ReactComponent { | attrs }
wbr = motionComponentImpl "wbr"

-- No support in React.Basic.Hooks
-- webview :: forall attrs attrs_. Union attrs attrs_ (MotionProps + DOM.Props_webview) => ReactComponent { | attrs }
-- webview = motionComponentImpl "webview"
svgAnimate :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_animate) => ReactComponent { | attrs }
svgAnimate = motionComponentImpl "animate"

circle :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_circle) => ReactComponent { | attrs }
circle = motionComponentImpl "circle"

clipPath :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_clipPath) => ReactComponent { | attrs }
clipPath = motionComponentImpl "clipPath"

defs :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_defs) => ReactComponent { | attrs }
defs = motionComponentImpl "defs"

desc :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_desc) => ReactComponent { | attrs }
desc = motionComponentImpl "desc"

ellipse :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_ellipse) => ReactComponent { | attrs }
ellipse = motionComponentImpl "ellipse"

feBlend :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feBlend) => ReactComponent { | attrs }
feBlend = motionComponentImpl "feBlend"

feColorMatrix :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feColorMatrix) => ReactComponent { | attrs }
feColorMatrix = motionComponentImpl "feColorMatrix"

feComponentTransfer :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feComponentTransfer) => ReactComponent { | attrs }
feComponentTransfer = motionComponentImpl "feComponentTransfer"

feComposite :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feComposite) => ReactComponent { | attrs }
feComposite = motionComponentImpl "feComposite"

feConvolveMatrix :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feConvolveMatrix) => ReactComponent { | attrs }
feConvolveMatrix = motionComponentImpl "feConvolveMatrix"

feDiffuseLighting :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feDiffuseLighting) => ReactComponent { | attrs }
feDiffuseLighting = motionComponentImpl "feDiffuseLighting"

feDisplacementMap :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feDisplacementMap) => ReactComponent { | attrs }
feDisplacementMap = motionComponentImpl "feDisplacementMap"

feDistantLight :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feDistantLight) => ReactComponent { | attrs }
feDistantLight = motionComponentImpl "feDistantLight"

feDropShadow :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feDropShadow) => ReactComponent { | attrs }
feDropShadow = motionComponentImpl "feDropShadow"

feFlood :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feFlood) => ReactComponent { | attrs }
feFlood = motionComponentImpl "feFlood"

feFuncA :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feFuncA) => ReactComponent { | attrs }
feFuncA = motionComponentImpl "feFuncA"

feFuncB :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feFuncB) => ReactComponent { | attrs }
feFuncB = motionComponentImpl "feFuncB"

feFuncG :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feFuncG) => ReactComponent { | attrs }
feFuncG = motionComponentImpl "feFuncG"

feFuncR :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feFuncR) => ReactComponent { | attrs }
feFuncR = motionComponentImpl "feFuncR"

feGaussianBlur :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feGaussianBlur) => ReactComponent { | attrs }
feGaussianBlur = motionComponentImpl "feGaussianBlur"

feImage :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feImage) => ReactComponent { | attrs }
feImage = motionComponentImpl "feImage"

feMerge :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feMerge) => ReactComponent { | attrs }
feMerge = motionComponentImpl "feMerge"

feMergeNode :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feMergeNode) => ReactComponent { | attrs }
feMergeNode = motionComponentImpl "feMergeNode"

feMorphology :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feMorphology) => ReactComponent { | attrs }
feMorphology = motionComponentImpl "feMorphology"

feOffset :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feOffset) => ReactComponent { | attrs }
feOffset = motionComponentImpl "feOffset"

fePointLight :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_fePointLight) => ReactComponent { | attrs }
fePointLight = motionComponentImpl "fePointLight"

feSpecularLighting :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feSpecularLighting) => ReactComponent { | attrs }
feSpecularLighting = motionComponentImpl "feSpecularLighting"

feSpotLight :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feSpotLight) => ReactComponent { | attrs }
feSpotLight = motionComponentImpl "feSpotLight"

feTile :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feTile) => ReactComponent { | attrs }
feTile = motionComponentImpl "feTile"

feTurbulence :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_feTurbulence) => ReactComponent { | attrs }
feTurbulence = motionComponentImpl "feTurbulence"

filter :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_filter) => ReactComponent { | attrs }
filter = motionComponentImpl "filter"

foreignObject :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_foreignObject) => ReactComponent { | attrs }
foreignObject = motionComponentImpl "foreignObject"

g :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_g) => ReactComponent { | attrs }
g = motionComponentImpl "g"

image :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_image) => ReactComponent { | attrs }
image = motionComponentImpl "image"

line :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_line) => ReactComponent { | attrs }
line = motionComponentImpl "line"

linearGradient :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_linearGradient) => ReactComponent { | attrs }
linearGradient = motionComponentImpl "linearGradient"

marker :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_marker) => ReactComponent { | attrs }
marker = motionComponentImpl "marker"

mask :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_mask) => ReactComponent { | attrs }
mask = motionComponentImpl "mask"

metadata :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_metadata) => ReactComponent { | attrs }
metadata = motionComponentImpl "metadata"

path :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_path) => ReactComponent { | attrs }
path = motionComponentImpl "path"

pattern :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_pattern) => ReactComponent { | attrs }
pattern = motionComponentImpl "pattern"

polygon :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_polygon) => ReactComponent { | attrs }
polygon = motionComponentImpl "polygon"

polyline :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_polyline) => ReactComponent { | attrs }
polyline = motionComponentImpl "polyline"

radialGradient :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_radialGradient) => ReactComponent { | attrs }
radialGradient = motionComponentImpl "radialGradient"

rect :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_rect) => ReactComponent { | attrs }
rect = motionComponentImpl "rect"

stop :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_stop) => ReactComponent { | attrs }
stop = motionComponentImpl "stop"

svg :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_svg) => ReactComponent { | attrs }
svg = motionComponentImpl "svg"

svgSwitch :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_switch) => ReactComponent { | attrs }
svgSwitch = motionComponentImpl "switch"

symbol :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_symbol) => ReactComponent { | attrs }
symbol = motionComponentImpl "symbol"

text :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_text) => ReactComponent { | attrs }
text = motionComponentImpl "text"

textPath :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_textPath) => ReactComponent { | attrs }
textPath = motionComponentImpl "textPath"

tspan :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_tspan) => ReactComponent { | attrs }
tspan = motionComponentImpl "tspan"

use :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_use) => ReactComponent { | attrs }
use = motionComponentImpl "use"

view :: forall attrs attrs_. Union attrs attrs_ (MotionProps + SVG.Props_view) => ReactComponent { | attrs }
view = motionComponentImpl "view"
