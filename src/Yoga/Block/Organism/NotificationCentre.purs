module Yoga.Block.Organism.NotificationCentre where

import Yoga.Prelude.View

import Yoga.Block.Organism.NotificationCentre.Types (Notification, NotificationCentre(..), NotificationCentreMessage(..), NotificationId, OnNotification, SubscriberId)
import Data.Map (Map)
import Data.Map as Map
import Data.Newtype (class Newtype, wrap)
import Effect.Aff (delay, launchAff_)
import Effect.Ref as Ref

mkNotificationCentre ∷ Effect NotificationCentre
mkNotificationCentre = do
  notificationsRef ← Ref.new Map.empty
  subscribersRef ← Ref.new Map.empty
  enqueueNotification ← mkEnqueueNotification notificationsRef subscribersRef
  subscribe ← mkSubscribe subscribersRef
  pure (NotificationCentre { enqueueNotification, subscribe })

mkEnqueueNotification
  ∷ Ref.Ref (Map NotificationId Notification)
  → Ref.Ref (Map SubscriberId OnNotification)
  → Effect (Notification → Effect Unit)
mkEnqueueNotification notificationsRef subscribersRef = do
  generateId ← mkGenerateId
  pure \n → do
    id ← generateId
    Ref.modify_ (Map.insert id n) notificationsRef
    let remove = removeNotification notificationsRef subscribersRef id
    subscribers ← Ref.read subscribersRef
    subscribers # traverse_
      (_ $ NotificationAdded id (n.render { dismiss: remove }))
    for_ n.autoHideAfter \hideAfter →
      launchAff_ (delay hideAfter *> do remove # liftEffect)

removeNotification
  ∷ Ref.Ref (Map NotificationId Notification)
  → Ref.Ref (Map SubscriberId OnNotification)
  → NotificationId
  → Effect Unit
removeNotification notificationsRef subscribersRef id = do
  Ref.modify_ (Map.delete id) notificationsRef
  subscribers ← Ref.read subscribersRef
  subscribers # traverse_
    (_ $ NotificationDismissed id)

mkSubscribe
  ∷ Ref.Ref (Map SubscriberId OnNotification)
  → Effect (OnNotification → Effect (Effect Unit))
mkSubscribe subscribersRef = do
  generateId ← mkGenerateId
  pure \callback → do
    id ← generateId
    subscribersRef # Ref.modify_ (Map.insert id callback)
    let unsubscribe = subscribersRef # Ref.modify_ (Map.delete id)
    pure unsubscribe

mkGenerateId ∷ ∀ nt. Newtype nt Int ⇒ Effect (Effect nt)
mkGenerateId = ado
  counterRef ← Ref.new 0
  in wrap <$> Ref.modify (_ + 1) counterRef
