module Yoga.Block.Organism.NotificationCentre.Notification.View where

import Yoga.Prelude.View

import Yoga.Block.Organism.NotificationCentre.Notification.Style (defaultAutoHideNotificationBackgroundStyle, defaultDismissButtonStyle, defaultNotificationBodyStyle, defaultNotificationContainerStyle, defaultNotificationContentContainerStyle, defaultNotificationContentStyle, defaultNotificationStyle, defaultNotificationTitleStyle)
import Yoga.Block.Organism.NotificationCentre.Types (NotificationCentre(..), NotificationCentreMessage(..), NotificationId(..), Notification)
import Data.Array as Array
import Data.Newtype (un)
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple (fst)
import Framer.Motion as M
import Yoga.Block.Hook.UseRenderInPortal (useRenderInPortal)
import Fahrtwind.Icon.Heroicons as Heroicons
import React.Basic.DOM as R
import React.Basic.Hooks as React

type Args =
  { containerId ∷ String
  , renderNotifications ∷ Array (NotificationId /\ JSX) → JSX
  }

mkNotificationCentreView
  ∷ NotificationCentre → Args → Effect JSX
mkNotificationCentreView
  (NotificationCentre { subscribe })
  { containerId, renderNotifications } =
  do
    render ← React.component "NotificationCentre" \_ → React.do
      notifications /\ updateNotifications ← React.useState []
      renderInPortal ← useRenderInPortal containerId
      useEffectOnce do
        subscribe case _ of
          NotificationAdded id view → updateNotifications
            (Array.cons (id /\ view))
          NotificationDismissed id → updateNotifications
            (Array.filter (fst >>> (_ /= id)))
      let view = renderNotifications notifications
      pure (renderInPortal view)
    pure (render unit)

renderAnimatedNotifications ∷ Array (NotificationId /\ JSX) → JSX
renderAnimatedNotifications items =
  M.div </* { css: defaultNotificationContainerStyle } />
    [ M.animatePresence </ { initial: false } />
        ( items <#> \(NotificationId id /\ content) →
            M.div
              </*
                { css: defaultNotificationStyle
                , initial: M.initial
                    ( R.css
                        { y: -40
                        , x: 0
                        , scale: 0.3
                        , opacity: 0
                        }
                    )
                , animate: M.animate
                    ( R.css
                        { y: 0
                        , x: 0
                        , scale: 1
                        , opacity: 1
                        , transition: { bounce: 0.05 }
                        }
                    )
                , exit: M.exit
                    ( R.css
                        { scale: 1.0
                        , y: 0
                        , x: 500
                        , opacity: 1.0
                        , transition: { duration: 0.5 }
                        }
                    )
                , key: show id
                , layoutId: M.layoutId $ show id
                , style: R.css { transformOrigin: "center center" }
                }
              />
                [ content ]

        )
    ]

notificationDismissButton ∷ Effect Unit → JSX
notificationDismissButton dismiss = R.button'
  </*
    { onClick: handler_ dismiss
    , css: defaultDismissButtonStyle

    }
  /> [ Heroicons.cross ]

autoHideNotification
  ∷ { autoHideAfter ∷ Milliseconds, body ∷ JSX, title ∷ String }
  → Notification
autoHideNotification { autoHideAfter, title, body } =
  { render: \{ dismiss } →
      R.div'
        </*
          { css: defaultNotificationContentContainerStyle
          }
        />
          [ R.div'
              </*
                { css: defaultAutoHideNotificationBackgroundStyle
                , style: R.css
                    { "--auto-hide-duration": show (un Milliseconds autoHideAfter)
                        <> "ms"
                    }
                }
              /> []
          , R.div' </* { css: defaultNotificationContentStyle } />
              [ R.div' </* { css: defaultNotificationTitleStyle } />
                  [ R.text title ]
              , R.div' </* { css: defaultNotificationBodyStyle } />
                  [ body ]
              ]
          , notificationDismissButton dismiss
          ]
  , autoHideAfter: Just autoHideAfter
  }