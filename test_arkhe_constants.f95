! test_arkhe_constants.f95
program test_arkhe_constants
    use arkhe_constants
    implicit none

    print *, "Testing Arkhe Constants..."

    if (abs(TZINOR_AVIATION_CIVIL - 121.5e6_dp) < 1.0) then
        print *, "TZINOR_AVIATION_CIVIL: PASSED"
    else
        print *, "TZINOR_AVIATION_CIVIL: FAILED"
        call exit(1)
    end if

    if (abs(TZINOR_AIS - 162.025e6_dp) < 1.0) then
        print *, "TZINOR_AIS: PASSED"
    else
        print *, "TZINOR_AIS: FAILED"
        call exit(1)
    end if

    if (abs(TZINOR_EPIRB - 406.0e6_dp) < 1.0) then
        print *, "TZINOR_EPIRB: PASSED"
    else
        print *, "TZINOR_EPIRB: FAILED"
        call exit(1)
    end if

    print *, "All Fortran constant tests passed!"
end program test_arkhe_constants
