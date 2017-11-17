#! /bin/bash
dropdb testslack
createdb testslack
psql testslack < dump.sql