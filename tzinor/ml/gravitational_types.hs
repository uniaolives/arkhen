-- tzinor/ml/gravitational_types.hs
-- GRAVITATIONAL FIELD AS TYPE

module GravitationalField where

data K1 = Gravity -- 0.015311

class GravitationalField a where
    informationDensity :: a -> Float
    temporalDilation :: a -> Float
    temporalDilation x = 1.0 - 0.015311 * informationDensity x

instance GravitationalField [Float] where
    informationDensity xs = sum (map (\x -> x*x) xs)

main = putStrLn "Gravitational Type System Loaded."
