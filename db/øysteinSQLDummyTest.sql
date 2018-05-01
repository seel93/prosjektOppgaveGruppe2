use AS_SykkelUtleie;

#insert into poststed(poststed, postnr) values('Oslo', '0789');
#insert into poststed(poststed, postnr) values('Haugen', '9912');
#insert into poststed(poststed, postnr) values('Bakken', '9916');
#insert into poststed(poststed, postnr) values('Jordet', '9840');
#insert into poststed(poststed, postnr) values('Tjernet', '9445');
#insert into poststed(poststed, postnr) values('Stubben', '0988');
#insert into poststed(poststed, postnr) values('Oslo', '0789');

#insert into steder(sted_id, stedsnavn, poststed_postnr) values(1, 'Haugen', '9912');
#insert into steder(sted_id, stedsnavn, poststed_postnr) values(2, 'Bakken', '9916');
#insert into steder(sted_id, stedsnavn, poststed_postnr) values(3, 'Jordet', '9840');
#insert into steder(sted_id, stedsnavn, poststed_postnr) values(7, 'Tjernet', '9445');
#insert into steder(sted_id, stedsnavn, poststed_postnr) values(11, 'Stubben', '0988');

#insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(1, 'Sykkel', 'testnavn1', 699, 149, 'kode1', 1, 2, '45', '45', 'flytt');
#insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(2, 'Hjelm', 'testnavn2', 99.99, 19.99, 'kode2', 3, 3, '', '', 'klar');
#insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(3, 'Lappesaker', 'testnavn3', 699, 149, 'kode3', 11, 7, NULL, NULL, 'flytt');
#insert into Utstyr(utstyr_id, utstyr_Type, utstyr_navn, dagspris, timepris, utstyrkode, var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, utstyr_status) values(4, 'Sykkel', 'testnavn4', 899.99, 179.99, 'kode4', 11, 2, '30', '30', 'reparasjon');

insert into kunde(fnavn, enavn, mob_nr, epost, kunde_password, steder_sted_id) values('stein', 'steinar', '45401888', 'stein@stein.no', 'steinar', '7');

select * from kunde;

#select * from steder;

