package com.miracle.AMAG.repository.common;

import com.miracle.AMAG.entity.common.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
