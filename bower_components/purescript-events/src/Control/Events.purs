module Control.Events where

  import Data.Function
    ( Fn0()
    , Fn1()
    , Fn2()
    , Fn3()
    , Fn4()
    , Fn5()
    , Fn6()
    , Fn7()
    , Fn8()
    , Fn9()
    , Fn10()
    )

  foreign import data EventEff :: !

  newtype Event = Event String

  class EventEmitter e

  class Variadic func ret

  instance variadicArr  :: Variadic (a -> b) c
  instance variadicFn0  :: Variadic (Fn0  a) b
  instance variadicFn1  :: Variadic (Fn1  a b) c
  instance variadicFn2  :: Variadic (Fn2  a b c) d
  instance variadicFn3  :: Variadic (Fn3  a b c d) e
  instance variadicFn4  :: Variadic (Fn4  a b c d e) f
  instance variadicFn5  :: Variadic (Fn5  a b c d e f) g
  instance variadicFn6  :: Variadic (Fn6  a b c d e f g) h
  instance variadicFn7  :: Variadic (Fn7  a b c d e f g h) i
  instance variadicFn8  :: Variadic (Fn8  a b c d e f g h i) j
  instance variadicFn9  :: Variadic (Fn9  a b c d e f g h i j) k
  instance variadicFn10 :: Variadic (Fn10 a b c d e f g h i j k) l
