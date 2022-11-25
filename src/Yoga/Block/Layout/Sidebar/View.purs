module Yoga.Block.Layout.Sidebar.View (component, Props, PropsF) where

import Yoga.Prelude.View

import Data.Array as Array
import React.Basic.DOM (aside', div')
import React.Basic.Emotion as Emotion
import Yoga.Block.Layout.Sidebar.Style (SidebarSide(..))
import Yoga.Block.Layout.Sidebar.Style as Style

type PropsF f =
  ( className ∷ f String
  , sidebar ∷ JSX
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { sidebar ∷ JSX, children ∷ Array JSX | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Sidebar" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        flipChildren =
          if (props.side ?|| SidebarLeft) == SidebarRight then
            Array.reverse
          else identity

      pure
        $ emotionDiv ref
            props
            { className: "ry-sidebar__container " <>? props.className
            , css: Style.sidebarContainer props
            , children:
                flipChildren
                  [ Emotion.element aside'
                      { className: "ry-sidebar__sidebar"
                      , css: Style.sidebar
                      , children: [ props.sidebar ]
                      }
                  , Emotion.element div'
                      { className: "ry-sidebar__not-sidebar"
                      , css: Style.notSidebar props
                      , children: props.children
                      }
                  ]
            }
