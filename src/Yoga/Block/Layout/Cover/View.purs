module Yoga.Block.Layout.Cover.View (component, Props, PropsF, PropsNoChildrenF, PropsNoChildren) where

import Yoga.Prelude.View

import React.Basic.DOM as R
import Yoga.Block.Internal (DivPropsNoChildren)
import Yoga.Block.Layout.Cover.Style as Style

type PropsNoChildrenF f =
  ( className ∷ f String
  , header ∷ f JSX
  , footer ∷ f JSX
  , centreInRemaining ∷ f Boolean
  | Style.Props f + DivPropsNoChildren
  )

type PropsF f =
  ( children ∷ Array JSX
  | PropsNoChildrenF f
  )

type PropsNoChildren =
  PropsNoChildrenF Id

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Cover" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let 
        { header, footer } = if props.centreInRemaining # isTruthy then 
            { header: props.header # foldMap \jsx -> R.div' </* { className: "header", css: Style.header props } /> [ jsx ]
            , footer: props.footer # foldMap \jsx -> R.div' </* { className: "footer", css: Style.footer props } /> [ jsx ] 
            }
          else
            case opToMaybe props.header, opToMaybe props.footer of
            Just headerJSX, Just footerJSX ->
              { header: R.div' </* { className: "header", css: Style.header props } /> [ headerJSX ]
              , footer: R.div' </* { className: "footer", css: Style.footer props } /> [ footerJSX ] 
              }
            Just headerJSX, Nothing ->
              { header: R.div' </* { className: "header", css: Style.header props } /> [ headerJSX ]
              , footer: R.div' </* { className: "footer", css: Style.footer props <> Style.invisible } /> [ headerJSX ] 
              }
            Nothing, Just footerJSX ->
              { header: R.div' </* { className: "header", css: Style.header props <> Style.invisible } /> [ footerJSX ]
              , footer: R.div' </* { className: "footer", css: Style.footer props } /> [ footerJSX ] 
              }
            Nothing, Nothing -> mempty
            
        main = 
            R.div' </* { className: "main", css: Style.main } /> props.children
      pure
        $ emotionDiv
            ref
            props
            { className: "ry-cover " <>? props.className
            , css: Style.cover props
            , children: [ header, main, footer ]
            }
