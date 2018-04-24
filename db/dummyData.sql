use AS_SykkelUtleie;


insert into Levering (bestilling_bestilling_id, leveringsdato, leveringssted) values();

insert into Utstyr(utstyr_id, ustyr_Type, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values();

insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values();

insert into ansatt(ansatt_id, Jobb, fulltid, loenn, ansatt_password, stedet_sted_id) values();

insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestllingsdato, kan_hentes, maa_leveres_foer) values();

insert into kunde(kunde_id, fnavn, enavn, mob_nr, e-post, kunde_password, steder_sted_id) values();

insert into poststed(poststed, postnr) values();

insert into steder(sted_id, stedsnavn, poststed_postnr) values();



