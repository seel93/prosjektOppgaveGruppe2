USE AS_sykkelUtleie;

#****IMPORTER POSTNR VIA MySQL WORKBENCH****
insert into poststed(poststed, postnr) values('Haugen', '9912');
insert into poststed(poststed, postnr) values('Bakken', '9916');
insert into poststed(poststed, postnr) values('Jordet', '9840');
insert into poststed(poststed, postnr) values('Tjernet', '9445');
insert into poststed(poststed, postnr) values('Stubben', '0988');
insert into poststed(poststed, postnr) values('Oslo', '0001');


#--STEDERINSERT
insert into steder(sted_id, stedsnavn, poststed_postnr) values(1, 'Haugen', '9912');
insert into steder(sted_id, stedsnavn, poststed_postnr) values(2, 'Bakken', '9916');
insert into steder(sted_id, stedsnavn, poststed_postnr) values(3, 'Jordet', '9840');
insert into steder(sted_id, stedsnavn, poststed_postnr) values(7, 'Tjernet', '9445');
insert into steder(sted_id, stedsnavn, poststed_postnr) values(11, 'Stubben', '0988');

#--UTSTYRINSERT
insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(1, 'Sykkel', 'testnavn1', 699, 149, 'kode1', 1, 2, '45', '45', 'flytt');
insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(2, 'Hjelm', 'testnavn2', 99.99, 19.99, 'kode2', 3, 3, '', '', 'klar');
insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(3, 'Lappesaker', 'testnavn3', 699, 149, 'kode3', 11, 7, NULL, NULL, 'flytt');
insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(4, 'Sykkel', 'testnavn4', 899.99, 179.99, 'kode4', 11, 2, '30', '30', 'reparasjon');

#--KUNDEINSERT
insert into kunde(kunde_id, fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values(1, 'Gilbert', 'Gerdsen', 12345323, 'GG@epost.no', 'gilgerd', 1 );
insert into kunde(kunde_id, fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values(2, 'Per', 'Lang', 15236351, 'PL@hotmail.net', 'Plang', 2 );
insert into kunde(kunde_id, fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values(3, 'Ole', 'Kort', 12152155, 'OK@gmail.com', 'Okort', 7 );
insert into kunde(kunde_id, fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values(4, 'Ola', 'Lien', 77624252, 'OL@epost.no', 'Olien', 11 );
insert into kunde(kunde_id, fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values(5, 'Pia', 'Aas', 12356744, 'PA@epost.no', 'Paas', 3 );

#--ANSATTINSERT
insert into ansatt(ansatt_id, Jobb, fulltid, loenn, ansatt_password, steder_sted_id) values(1, 'salgsperson', '1', '16161616', 'hemeli', 1);
insert into ansatt(ansatt_id, Jobb, fulltid, loenn, ansatt_password, steder_sted_id) values(2, 'flytter', '0', '846823', 'mypw', 1);
insert into ansatt(ansatt_id, Jobb, fulltid, loenn, ansatt_password, steder_sted_id) values(3, 'reparatoer', '1', '5215123', 'annet', 7);
insert into ansatt(ansatt_id, Jobb, fulltid, loenn, ansatt_password, steder_sted_id) values(4, 'salgsperson', '1', '68238', 'tredje', 2);

#--BESTILLINGINSERT
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(1, 798.99, 0, 1, 1, '2013-12-13', '2013-12-13', '2013-12-14');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(2, 179.99, 0, 3, 4, '2013-12-13 15:47:35', '2013-12-13 16:00:00', '2013-12-14 17:00:00');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(3, 3397.96, 1, 5, 4, '2015-04-17 12:53:12', '2015-04-19 07:00:00', '2015-04-21 07:00:00');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(4, 447, 0, 2, 1, '2017-07-13 13:50:37', '2017-07-13 13:50:37', '2017-07-13 16:50:37');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(5, 3397.96, 1, 5, 4, '2016-08-20 15:53:23', '2016-08-23 13:00:00', '2016-08-25 13:00:00');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(6, 4194, 0, 4, 1, '2017-11-27 21:42:52', '2017-11-29 07:00:00', '2017-12-05 07:00:00');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(7, 5096.94, 1, 3, 1, '2018-01-17 18:17:03', '2018-01-28 07:00:00', '2018-01-31 07:00:00');
insert into bestilling(bestilling_id, pris, gruppe, kunde_kunde_id, ansatt_ansatt_id, bestillingsdato, kan_hentes, maa_leveres_foer) values(8, 14000, 0, 1, 1, '2018-03-17 18:17:03', '2018-05-06 07:00:00', '2018-05-26 07:00:00');

#--UTSTYR_BESTILLING_SAMMENINSERT
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 1);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(2, 1);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(4, 2);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 3);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(2, 3);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(4, 3);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(3, 4);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 5);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(2, 5);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(4, 5);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 6);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 7);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(2, 7);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(4, 7);
insert into Utstyr_has_bestilling(Utstyr_utstyr_id, bestilling_bestilling_id) values(1, 8);

#--LEVERINGINSERT
insert into Levering (bestilling_bestilling_id, leveringsdato, leveringssted) values(1, '2013-12-13 19:34:54', 11);


