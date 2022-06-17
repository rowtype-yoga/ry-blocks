module Yoga.Block.Organism.NotificationCentre.Types where

import Yoga.Prelude.View

import Data.Newtype (class Newtype)
import Data.Time.Duration (Milliseconds)

-- | Phantom type for the notification centre
newtype NotificationCentre = NotificationCentre
  { enqueueNotification ∷ Notification → Effect Unit
  , subscribe ∷ OnNotification → Effect (Effect Unit)
  }

type OnNotification = NotificationCentreMessage → Effect Unit

newtype NotificationId = NotificationId Int

derive instance Eq NotificationId
derive instance Ord NotificationId
derive instance Newtype NotificationId _

newtype SubscriberId = SubscriberId Int

derive instance Eq SubscriberId
derive instance Ord SubscriberId
derive instance Newtype SubscriberId _

data NotificationCentreMessage
  = NotificationAdded NotificationId JSX
  | NotificationDismissed NotificationId

type Notification =
  { render ∷ { dismiss ∷ Effect Unit } → JSX
  , autoHideAfter ∷ Maybe Milliseconds
  }