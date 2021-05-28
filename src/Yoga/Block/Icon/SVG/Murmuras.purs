module Yoga.Block.Icon.SVG.Murmuras where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

murmuras :: JSX
murmuras = SVG.svg
     { width: "800"
     , height: "110"
     , xmlns: "http://www.w3.org/2000/svg"
     , xmlSpace: "preserve"
     , children: 
     [ SVG.path
       { fill: "#2872b0"
       , d: "M85.91 20.398c-9.269 0-17.187 3.649-22.548 9.607a.166.166 0 0 1-.261-.016c-4.537-6.35-11.233-9.59-20.091-9.59-7.672 0-14.422 2.635-18.96 7.259a.168.168 0 0 1-.29-.118v-5.456a.174.174 0 0 0-.174-.173H6.882a.174.174 0 0 0-.173.173v67.718c0 .095.078.173.173.173H25.1a.174.174 0 0 0 .173-.173V50.374c0-8.113 4.95-13.2 12.513-13.2 7.287 0 12.1 5.087 12.1 13.2v39.428c0 .095.078.173.173.173h18.217a.174.174 0 0 0 .173-.173v-39.84c0-7.563 5.225-12.788 12.513-12.788 7.287 0 12.1 5.087 12.1 13.2v39.428c0 .095.078.173.173.173h18.216a.174.174 0 0 0 .174-.173v-42.04c0-16.501-9.763-27.364-25.713-27.364m83.637 1.513a.173.173 0 0 0-.173.173v39.428c0 7.838-5.5 13.063-12.65 13.063-7.563 0-12.926-5.225-12.926-13.063V22.084a.173.173 0 0 0-.174-.173H125.41a.173.173 0 0 0-.173.173V60c0 18.975 13.338 31.625 31.488 31.625 17.738 0 31.214-12.65 31.214-31.625V22.084a.173.173 0 0 0-.175-.173H169.55zm68.441-.825c-7.397 0-13.873 3.157-18.4 8.57a.17.17 0 0 1-.301-.107v-7.465a.174.174 0 0 0-.173-.173h-16.704a.174.174 0 0 0-.173.173v67.718c0 .095.077.173.173.173h18.216a.174.174 0 0 0 .173-.173v-33.79c0-11.688 7.15-17.738 18.288-17.738h4.777a.173.173 0 0 0 .174-.174V22.042a.176.176 0 0 0-.126-.169c-1.752-.525-3.641-.787-5.925-.787m93.356-.688c-9.27 0-17.179 3.649-22.539 9.607a.167.167 0 0 1-.262-.016c-4.536-6.35-11.233-9.59-20.091-9.59-7.672 0-14.42 2.635-18.959 7.259a.168.168 0 0 1-.291-.118v-5.456a.174.174 0 0 0-.174-.173h-16.704a.174.174 0 0 0-.173.173v67.718c0 .095.078.173.173.173h18.217a.174.174 0 0 0 .173-.173V50.374c0-8.113 4.95-13.2 12.513-13.2 7.288 0 12.1 5.087 12.1 13.2v39.428c0 .095.078.173.173.173h18.217a.174.174 0 0 0 .173-.173v-39.84c0-7.563 5.225-12.788 12.504-12.788 7.287 0 12.1 5.087 12.1 13.2v39.428c0 .095.078.173.173.173h18.217a.174.174 0 0 0 .173-.173v-42.04c0-16.501-9.763-27.364-25.713-27.364m83.647 1.513a.173.173 0 0 0-.173.173v39.428c0 7.838-5.5 13.063-12.65 13.063-7.563 0-12.926-5.225-12.926-13.063V22.084a.173.173 0 0 0-.174-.173h-18.215a.173.173 0 0 0-.173.173V60c0 18.975 13.337 31.625 31.488 31.625 17.738 0 31.204-12.65 31.204-31.625V22.084a.173.173 0 0 0-.174-.173h-18.207zm68.432-.825c-7.397 0-13.872 3.156-18.39 8.569a.17.17 0 0 1-.301-.106v-7.465a.174.174 0 0 0-.174-.173h-16.703a.174.174 0 0 0-.174.173v67.718c0 .095.078.173.174.173h18.215a.174.174 0 0 0 .174-.173v-33.79c0-11.688 7.141-17.738 18.279-17.738h4.776a.173.173 0 0 0 .174-.174V22.042a.177.177 0 0 0-.125-.169c-1.752-.525-3.642-.787-5.925-.787m40.701-.688c-11.914 0-21.782 4.638-29.605 13.911a.179.179 0 0 0 0 .228l9.405 11.152c.067.079.188.08.26.004 5.988-6.361 10.917-9.207 17.877-9.207 8.25 0 12.65 4.4 12.65 11.963v16.088c0 7.838-6.187 13.475-14.3 13.475-5.912 0-9.762-2.887-9.762-7.425s3.437-6.875 9.487-6.875h7.985a.173.173 0 0 0 .174-.173V51.647a.174.174 0 0 0-.174-.173h-10.46c-15.813 0-25.713 7.563-25.713 19.8 0 11.963 9.075 20.351 23.513 20.351 8.494 0 15.535-3.04 20.473-7.956a.17.17 0 0 1 .29.12v6.013c0 .095.078.173.173.173h16.703a.174.174 0 0 0 .175-.173V49.549c0-18.838-11.413-29.15-29.151-29.15m73.015 28.738-6.601-2.75c-5.363-2.2-7.15-3.438-7.15-6.05 0-3.163 2.75-4.813 7.287-4.813 5.583 0 10.626 2.157 15.13 6.337a.171.171 0 0 0 .249-.015l9.136-11.153a.178.178 0 0 0-.007-.233c-6.174-6.663-14.253-10.062-24.37-10.062-14.85 0-25.026 7.563-25.026 20.35 0 10.039 6.05 15.676 18.563 20.764l7.288 3.025c5.088 2.2 7.013 3.3 7.013 6.188 0 3.712-3.713 5.637-8.663 5.637-6.687 0-13.103-2.979-18.98-9.072a.172.172 0 0 0-.256.007l-9.138 11.02a.176.176 0 0 0-.005.22c6.194 8.183 16.195 13.088 28.104 13.088 7.7 0 14.025-1.925 18.975-5.775 5.088-3.85 7.563-9.213 7.563-15.95 0-10.038-5.913-15.4-19.113-20.763m84.136 16.106a3.895 3.895 0 0 1-2.823-1.219l-3.015-3.199a1.418 1.418 0 0 1-.337-1.362 1.42 1.42 0 0 1 .992-.994l35.69-10.01a.18.18 0 0 0 .067-.307 15.2 15.2 0 0 0-9.76-3.565c-1.368 0-2.732.186-4.057.553a4.05 4.05 0 0 1-1.072.145 4.066 4.066 0 0 1-2.94-1.265l-17.703-18.796a.171.171 0 0 0-.07-.046l-18.234-6.13a.174.174 0 0 0-.19.275l17.9 22.232a4.018 4.018 0 0 1-.133 5.214l-4.493 5.039c-.673.755-1.57 1.322-2.575 1.442a3.876 3.876 0 0 1-1.867-.232l-3.614-1.393a1.43 1.43 0 0 1-.552-2.284l4.705-5.28a.172.172 0 0 0 .006-.225l-24.694-30.671a4.056 4.056 0 0 1-.165-4.839 4.038 4.038 0 0 1 4.596-1.515l32.881 11.055c.627.21 1.2.575 1.653 1.06l16.797 17.83c.039.042.094.06.15.051a23.202 23.202 0 0 1 22.933 9.964l1.063 1.58a4.04 4.04 0 0 1 .443 3.643 4.047 4.047 0 0 1-2.7 2.494l-37.834 10.61a3.894 3.894 0 0 1-1.048.145M660.78 76.944a3.606 3.606 0 0 1-.12 4.676l-11.514 12.92c-.115.13.01.33.176.283l42.295-11.863c.137-.039.176-.221.066-.31a13.044 13.044 0 0 0-8.159-2.88c-1.172 0-2.343.16-3.479.474a3.619 3.619 0 0 1-3.598-1.006l-15.311-16.254a.17.17 0 0 0-.07-.045l-15.29-5.14c-.164-.056-.3.138-.191.273l15.194 18.872zm-22.957 28.48a3.598 3.598 0 0 1-3.07-1.701 3.64 3.64 0 0 1 .37-4.324l17.998-20.195a.174.174 0 0 0 .006-.225l-21.315-26.475a3.638 3.638 0 0 1-.15-4.338 3.621 3.621 0 0 1 4.12-1.36l28.489 9.577a3.627 3.627 0 0 1 1.48.948l14.502 15.395a.17.17 0 0 0 .149.051 20.22 20.22 0 0 1 19.913 8.697l.857 1.27c.282.416.513.873.609 1.365.39 2-.836 3.75-2.569 4.236L638.8 105.29a3.635 3.635 0 0 1-.977.134"
       }
     , SVG.path
       { fill: "#2872b0"
       , d: "M740.866 49.008a4.316 4.316 0 0 1-.14 5.596l-15.206 17.06c-.115.13.01.33.177.283l54.922-15.405a.18.18 0 0 0 .069-.306 16.732 16.732 0 0 0-10.891-4.05 16.7 16.7 0 0 0-4.462.608 4.352 4.352 0 0 1-1.154.156 4.346 4.346 0 0 1-3.152-1.36l-19.398-20.592a.171.171 0 0 0-.07-.045l-20.32-6.832c-.165-.055-.3.138-.191.273l19.816 24.614zm-28.819 35.596a4.307 4.307 0 0 1-3.674-2.037 4.351 4.351 0 0 1 .44-5.175l22.908-25.701a.174.174 0 0 0 .005-.225L704.638 17.82a4.355 4.355 0 0 1-.178-5.191A4.334 4.334 0 0 1 709.39 11l35.999 12.102a4.337 4.337 0 0 1 1.77 1.136L765.59 43.8c.04.041.095.06.151.051a25.31 25.31 0 0 1 25.072 10.863l1.092 1.619c.333.494.607 1.037.722 1.62.47 2.393-.992 4.493-3.072 5.076l-76.34 21.412c-.38.108-.773.162-1.168.162"
       }
     ]
     }