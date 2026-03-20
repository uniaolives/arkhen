! arkhe_constants.f95 (adicionado)
module arkhe_constants
    use, intrinsic :: iso_fortran_env, only: dp => real64
    implicit none

    real(dp), parameter :: TZINOR_AVIATION_CIVIL = 121.5e6_dp
    real(dp), parameter :: TZINOR_NAVY_SONOBUOY  = 155.160e6_dp
    real(dp), parameter :: TZINOR_AIS            = 162.025e6_dp
    real(dp), parameter :: TZINOR_NOAA_1         = 162.400e6_dp
    real(dp), parameter :: TZINOR_NOAA_2         = 162.425e6_dp
    real(dp), parameter :: TZINOR_NOAA_3         = 162.450e6_dp
    real(dp), parameter :: TZINOR_NOAA_4         = 162.475e6_dp
    real(dp), parameter :: TZINOR_NOAA_5         = 162.500e6_dp
    real(dp), parameter :: TZINOR_NOAA_6         = 162.525e6_dp
    real(dp), parameter :: TZINOR_NOAA_7         = 162.550e6_dp
    real(dp), parameter :: TZINOR_NATO           = 172.5e6_dp
    real(dp), parameter :: TZINOR_AVIATION_MIL   = 243.0e6_dp
    real(dp), parameter :: TZINOR_SARSAT         = 282.8e6_dp
    real(dp), parameter :: TZINOR_EPIRB          = 406.0e6_dp
    real(dp), parameter :: TZINOR_FED_DISASTER   = 412.825e6_dp
    real(dp), parameter :: TZINOR_FRS_1          = 462.6125e6_dp
    real(dp), parameter :: TZINOR_FRS_2          = 462.6750e6_dp
    real(dp), parameter :: TZINOR_GMRS           = 462.7250e6_dp
    real(dp), parameter :: TZINOR_MURS_MIN       = 151.820e6_dp
    real(dp), parameter :: TZINOR_MURS_MAX       = 154.600e6_dp
    real(dp), parameter :: TZINOR_HAM_1          = 3.940e6_dp
    real(dp), parameter :: TZINOR_HAM_2          = 7.250e6_dp
    real(dp), parameter :: TZINOR_HAM_3          = 14.300e6_dp
    real(dp), parameter :: TZINOR_HF_GCS_MIN     = 4.724e3_dp
    real(dp), parameter :: TZINOR_HF_GCS_MAX     = 11.175e3_dp

end module arkhe_constants
