module Yoga.Block.Organism.NotificationCentre.Notification.Story (default, notificationCentre) where

import Prelude

import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Organism.NotificationCentre (mkNotificationCentre)
import Yoga.Block.Organism.NotificationCentre.Notification.View (autoHideNotification, mkNotificationCentreView, renderAnimatedNotifications)
import Yoga.Block.Organism.NotificationCentre.Types (NotificationCentre(..))
import Yoga.Prelude.View (handler_)

storyNotificationCentre ∷ NotificationCentre
storyNotificationCentre = unsafePerformEffect mkNotificationCentre

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
    , title ∷ String
    }
default =
  { title: "Organism/NotificationCentre"
  , decorators:
      [ \storyFn ->
          Block.container
            </ {}
            />
              [ element E.global { styles: Styles.global }
              , unsafePerformEffect storyFn
              ]
      ]
  }

notificationCentre ∷ Effect JSX
notificationCentre = do
  let containerId = "notifications"
  let nc@(NotificationCentre { enqueueNotification }) = storyNotificationCentre
  notificationsView <- mkNotificationCentreView nc
    { containerId
    , renderNotifications: renderAnimatedNotifications
    }
  pure $ fragment
    [ R.div { id: containerId }
    , Block.button
        { onClick: handler_ $ enqueueNotification $ autoHideNotification
            { title: "Successfully updated ad"
            , body: fragment []
            , autoHideAfter: 3000.0 # Milliseconds
            }
        }
        [ R.text "Send notification" ]
    , notificationsView
    ]